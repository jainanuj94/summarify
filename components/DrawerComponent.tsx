import {
    Drawer, DrawerClose,
    DrawerContent,
    DrawerDescription, DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {Role, TextMessage} from "@copilotkit/runtime-client-gql";
import {useCopilotAction, useCopilotChat} from "@copilotkit/react-core";
import {toast} from "@/hooks/use-toast";

const DrawerComponent = () => {
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [loading, setLoading] = useState(false)
    const {appendMessage} = useCopilotChat();
    useCopilotAction({
        name: "addSuggestion",
        description: "When user needs suggestion, provide exactly 3 suggestions",
        parameters: [
            {
                name: "name",
            },
        ],
        handler: async ({name}) => {
            suggestions.push(name);
            if (suggestions.length == 3) {
                setLoading(false);
            }
        },
    });

    const handleSuggestion = async () => {
        setSuggestions([])
        setLoading(true)
        await appendMessage(new TextMessage({
            id: `suggestion-${Date.now()}`,
            content: "Suggest me 3 topics for article",
            role: Role.System,
        }))
    }

    const copyName = (value: string) => {
        navigator.clipboard?.writeText(value);
        toast({
            title: "Content Copied"
        })
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button onClick={handleSuggestion} className={"float-left"}>Need suggestions??</Button>
            </DrawerTrigger>
            <DrawerContent className={"bg-primary"}>
                <div className={"mx-auto w-full max-w-sm"}>
                    <DrawerHeader>
                        <DrawerTitle>
                            Suggestions for your article!!!
                        </DrawerTitle>
                        <DrawerDescription>
                            Here are a few suggestions for your article. Click on the topic to copy it!
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0 m-2">
                        {loading && "Loading..."}
                        <div className="flex flex-col items-center justify-start space-x-2 gap-4">
                            {suggestions.map((suggestion, index) => {
                                return (
                                    <Button variant="outline" onClick={() => copyName(suggestion)}
                                            className={"bg-opacity-100 opacity-100"} key={index}>{suggestion}</Button>
                                )
                            })
                            }
                        </div>
                    </div>
                    <DrawerFooter>
                        <DrawerClose>
                            <Button variant="outline">Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
        ;
}

export default DrawerComponent;