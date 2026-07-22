function formatGarnish(garnish, index) {
    if (!garnish || typeof garnish.name !== "string") {
        console.warn(`Malformed garnish at index ${index}:`, garnish)
    }
    const name = garnish?.name ?? "Unknown garnish";

    if (garnish?.qty !== undefined && !Number.isFinite(garnish.qty)) {
        console.warn(`Garnish "${name}" has invalid qty:`, garnish.qty);
    }
    const qty = Number.isFinite(garnish?.qty) ? garnish.qty : 1;

    return qty > 1 ? `${name} x${qty}` : name;
}

export function Garnishes({garnishes, styles}) {
    if (garnishes.length === 0) return null

    const es = garnishes.length > 1 ? "es" : ""
    const text = garnishes.map(formatGarnish).join(", ")

    return (
        <li className={styles.garnish}>
            Garnish{es}: {text}
        </li>
    )
}