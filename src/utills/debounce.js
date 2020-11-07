export function debounce(func, ms) {
    let interval
    return function (...args) {
        const context = this
        clearInterval(interval)
        interval = setTimeout(() => {
            func.apply(context, args)
        }, ms);
    }

}