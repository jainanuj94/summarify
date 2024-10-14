"use client";

import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {useCopilotChat, useCopilotReadable} from "@copilotkit/react-core";
import {MessageStatusCode, Role, TextMessage} from "@copilotkit/runtime-client-gql";
import {Input} from "@/components/ui/input";
import {useToast} from "@/hooks/use-toast";
import DrawerComponent from "@/components/DrawerComponent";
import {Copy} from "lucide-react";

const summaryContent = {
    SUMMERIFY: "Summerize the contents in a professional tone",
    CASUAL: "Summerize the contents in a casual tone",
    PIRATIFY: "Summerize the contents in a pirate tone",
    CHILDIFY: "Explain the contents like i am a five year old kid",
}

const summaryMap = [
    {
        label: "Summarify",
        type: "SUMMERIFY"
    },
    {
        label: "Summarify Casually",
        type: "CASUAL"
    },
    {
        label: "Break it Down (ELI5)",
        type: "CHILDIFY"
    },
    {
        label: "Arrr! Pirate Mode",
        type: "PIRATIFY"
    },
]
const Content = () => {
    const [url, setUrl] = useState('')
    const [content, setContent] = useState('');
    const [summerizedContent, setSummerizedContent] = useState('')
    const [loading, setLoading] = useState(false)
    const {toast} = useToast();
    const {appendMessage, visibleMessages} = useCopilotChat();

    useCopilotReadable({
        description: "Content to summerize",
        value: content,
    });

    useEffect(() => {
        if (visibleMessages && visibleMessages.length > 0) {
            // eslint-disable-next-line
            // @ts-expect-error
            const {content, status, role} = visibleMessages[visibleMessages.length - 1];
            if (role === "assistant") {
                setSummerizedContent(content)
                if ([MessageStatusCode.Success].includes(status.code)) {
                    setLoading(false)
                } else if ([MessageStatusCode.Failed].includes(status.code)){
                    toast({
                        title: "Something went wrong..",
                        description: "Unable to generate response.",
                    })
                    setLoading(false)
                } else {
                    setLoading(true)
                }
            }
        }
    }, [visibleMessages])

    const extractBody = async () => {
        setLoading(true)
        // Validate the URL
        try {
            new URL(url);
        } catch {
            toast({
                title: "Please enter a valid URL.",
                description: "The url entered by you is not a valid URL.",
            })
            return; // Exit if the URL is invalid
        }

        const response = await fetch('/api/extract', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({url}),
        });

        const data = await response.json();
        if (data.content) {
            setContent(data.content);
        } else {
            setContent('Failed to extract content.');
        }

        return (setLoading(false));
    };

    const handleSummerize = async (summaryType: string) => {
        if (!(!!content)) {
            toast({
                title: "Please add content to summarify.",
                description: "Please type some content to summerize.",
            })
            return;
        }
        setLoading(true)
        setSummerizedContent('Summerifying....')
        await appendMessage(
            new TextMessage({
                // eslint-disable-next-line
                // @ts-expect-error
                content: summaryContent[summaryType],
                role: Role.System,
            })
        );
    }

    const copyContents = () => {
        navigator.clipboard?.writeText(summerizedContent);
        toast(
            {
                title: "Summarified Contents copied to clipboard.",
            }
        )
    }

    return (
        <div className={"flex flex-col m-2 sm:flex-row gap-4 w-full h-full"}>
            <div className={"sm:w-2/5 w-full h-full flex-col gap-2 flex"}>
                <div className={"w-full flex-row gap-2 flex"}>
                    <Input
                        className={"text-gray-200"}
                        placeholder={"Enter URL to summerize."}
                        onChange={(e) => setUrl(e.target.value)}/>
                    <Button disabled={loading} onClick={extractBody}> Extract</Button>
                </div>
                <div>
                    <DrawerComponent/>
                </div>
                <Textarea
                    value={content}
                    disabled={loading}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={"Put your content here to summerify or extract the content using url."}
                    wrap={'soft'}
                    className={"w-full text-xl h-full border border-gray-300 rounded-md resize-none text-gray-200"}/>
            </div>
            <div
                className={"sm:w-1/5 w-full flex flex-row sm:flex-col items-center justify-items-center justify-center"}>
                {summaryMap.map((summaryObj, index) => {
                    return (
                        <Button
                            key={index}
                            disabled={loading}
                            className={"float-left m-2"}
                            onClick={() => handleSummerize(summaryObj.type)}>
                            {summaryObj.label}
                        </Button>
                    )
                })}
            </div>
            <div className={"sm:w-2/5 w-full relative"}>
                <Textarea
                    disabled={true}
                    wrap={'soft'}
                    value={summerizedContent}
                    className={"w-full text-xl h-full resize-none disabled:text-white"}/>
                <Button onClick={copyContents} size="sm" className={"absolute top-2 right-2 px-3 opacity-50 hover:opacity-100"}>
                    <span className="sr-only">Copy</span>
                    <Copy className="h-4 w-4" />
                </Button>
            </div>
        </div>
)
};

export default Content;
