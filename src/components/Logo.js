function Logo({ size, weight }) {
    function changeClass(...classnames) {
        return classnames.join(" ")
    }

    return (
        <div className="items-center">
            <h1
                className={changeClass(
                    "text-xl",
                    `font-${weight}`,
                    `text-${size}`
                )}
            >
                <span className="text-amber-500">
                    &lt;&nbsp;&nbsp;
                </span>
                skagur.dev
                <span className="text-amber-500">
                    &nbsp;/&nbsp;&gt;
                </span>
            </h1>
        </div>
    )
}

export default Logo
