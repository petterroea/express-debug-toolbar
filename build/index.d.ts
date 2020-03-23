declare class RequestCatcher {
    attach(app: any): void;
    private middleware;
    private getRouter;
}
declare const DebugToolbar: RequestCatcher;
export default DebugToolbar;
