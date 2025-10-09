import Workflows from "./components/workflows";

export default function Home() {
    return (
        <div className=" flex w-screen h-screen">
            <div className="h-full w-1/5 bg-[#414244]"></div>
            <div className="h-full w-4/5 ">
                <Workflows />
            </div>
        </div>
    );
}

