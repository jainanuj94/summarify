import Image from "next/image";

const Footer = () => {
    return (
        <footer className="row-start-3 flex gap-4 flex-wrap items-center justify-center">
            <a
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
            >
                &copy; 2024 - Anuj Jain. All rights reserved.
            </a>
            <a
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                href="https://www.copilotkit.ai/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Image
                    aria-hidden
                    src="https://nextjs.org/icons/globe.svg"
                    alt="Globe icon"
                    width={16}
                    height={16}
                />
                CopilotKit.ai →
            </a>
        </footer>
    )
}

export default Footer;