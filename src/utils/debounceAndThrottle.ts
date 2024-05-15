// 防抖；在事件被触发后，等待一定时间后执行事件处理函数，如果在这个等待时间内事件被重新触发，则重新计时
export function debounce<T extends (...args: any[]) => void>(func: T, delay = 300): (...args: Parameters<T>) => void {
    let timerId: ReturnType<typeof setTimeout>;

    return function (this: any, ...args: Parameters<T>): void {
        const context = this;

        clearTimeout(timerId);
        timerId = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}
// 节流；规定一个时间段，在这个时间段内只执行一次函数，即使事件被触发多次也只执行一次，然后等待下一个时间段
export function throttle<T extends (...args: any[]) => void>(func: T, delay = 300): (...args: Parameters<T>) => void {
    let timerId: ReturnType<typeof setTimeout>;
    let lastExecTime = 0;

    return function (this: any, ...args: Parameters<T>): void {
        const context = this;
        const currentTime = Date.now();

        if (currentTime - lastExecTime >= delay) {
            func.apply(context, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timerId);
            timerId = setTimeout(() => {
                func.apply(context, args);
                lastExecTime = currentTime;
            }, delay - (currentTime - lastExecTime));
        }
    };
}