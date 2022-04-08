import SocialIcon from "@/components/SocialIcon"
import siteMetadata from "@/lib/siteMetaData"

const Home = () => {
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
                    And I like to &nbsp;
                    <span className="font-mono font-bold border-2 rounded-2xl text-gray-600 bg-gray-200 items-center">
                        &nbsp;code&nbsp;
                    </span>
                </p>
                <p className="flex text-xl justify-center">
                    <SocialIcon
                        kind="linkedin"
                        href={siteMetadata.github}
                        size={6}
                    />
                </p>
            </div>
        </div>
    )
}

export default Home
