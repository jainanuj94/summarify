import TypographyH1 from "@/components/TypographyH1";
import TypographyH4 from "@/components/TypographyH4";

const Header = () => {
    return (
        <div className={"flex-col w-full static"}>
            <TypographyH1>
                Summarify
            </TypographyH1>
            <TypographyH4>
                A content summarization tool powered by CopilotKit, designed to deliver concise summaries in various
                tones tailored to your needs.
            </TypographyH4>
        </div>
    )
};

export default Header;