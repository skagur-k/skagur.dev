import type { NextPage } from "next"

const Home: NextPage = () => {
    return (
        <div className="flex flex-col mt-20 h-full items-center">
            <div className="items-center">
                <h1 className="text-xl md:text-3xl font-bold">
                    Hi, I am
                    <span className="text-amber-500">
                        &nbsp;&lt;&nbsp;
                    </span>
                    Nam Hyuck Kim
                    <span className="text-amber-500">
                        &nbsp;/&gt;
                    </span>
                </h1>
            </div>
            <div className="flex font-bold mt-10 text-xl gap-4 justify-center">
                <p className="">
                    And I Code computer.
                </p>
            </div>
        </div>
    )
}

export default Home
