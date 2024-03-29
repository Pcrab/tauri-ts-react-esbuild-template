declare module "*.module.scss" {
    interface IClassNames {
        [className: string]: string;
    }
    const classNames: IClassNames;
    export = classNames;
}

declare module "*.svg" {
    // const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    const content: string;
    export default content;
}
