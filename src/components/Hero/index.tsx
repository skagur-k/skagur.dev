import tw from "tailwind-styled-components";

interface ButtonProps {
    $primary: boolean;
}

const Button = tw.button<ButtonProps>`
     flex
     ${(p) => (p.$primary ? "bg-indigo-600" : "bg-indigo-300")}
 `;

const Hero = () => {
    return (
        <div className="container w-full flex items-center px-8 md:px-14 lg:px-18">
            <div className="">
                <h1 className="text-4xl">
                    <Button $primary={false}>
                        <div className="">Hello</div>
                    </Button>
                </h1>
            </div>
        </div>
    );
};

export default Hero;
