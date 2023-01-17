const classes = (...classes: (string | undefined)[]) => {
    const actualClasses = classes.filter(
        (className) => !!className,
    ) as string[];
    return actualClasses.join(" ");
};

export default classes;
