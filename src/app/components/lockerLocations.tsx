export const lockerLocations = (locker: number) => {
    switch (locker) {
        case 1:
            return (
                <div>
                    <h3>Prisma Linnanmaa</h3>
                    <h3>Kauppalinnankuja 1-3</h3>
                    <h3>90570 Oulu</h3>
                </div>
            )
        case 2:
            return (
                <div>
                    <h3>K-Market Kaijonharju</h3>
                    <h3>Sammonkatu 16</h3>
                    <h3>90570 Oulu</h3>
                </div>
            )
        case 3:
            return (
                <div>
                    <h3>Lidl Tuira</h3>
                    <h3>Tuirantie 14</h3>
                    <h3>90500 Oulu</h3>
                </div>
            )
        case 4:
            return (
                <div>
                    <h3>Lidl Pateniemi</h3>
                    <h3>Väliahontie 49</h3>
                    <h3>90800 Oulu</h3>
                </div>
            )
        case 5:
            return (
                <div>
                    <h3>Prisma Raksila</h3>
                    <h3>Tehtaankatu 3</h3>
                    <h3>90130 Oulu</h3>
                </div>
            )
    }
};