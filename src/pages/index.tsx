import type { NextPage } from "next"

const Home: NextPage = () => {
    return (
        <div className="flex flex-col mt-10 h-full items-center">
            <div className="items-center">
                <h1 className="text-xl md:text-3xl font-bold">
                    <span className="text-amber-500">
                        &lt;&nbsp;
                    </span>
                    skagur.dev
                    <span className="text-amber-500">
                        &nbsp;/&gt;
                    </span>
                </h1>
            </div>
            <div className="flex font-bold mt-20 gap-4 justify-center">
                <p className="">Projects</p>
                <p className="">About</p>
                <p className="">Blog</p>
            </div>
        </div>
    )
}

export default Home
