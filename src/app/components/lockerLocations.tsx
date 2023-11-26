export const lockerLocations = (locker: number) => {
    switch (locker) {
        case 1:
            return (
                <div>
                    <h3>Prisma Linnanmaa</h3>
                    <h3>address here</h3>
                </div>
            )
        case 2:
            return (
                <div>
                    <h3>Citymarket Kaakkuri</h3>
                    <h3>address here</h3>
                </div>
            )
        case 3:
            return (
                <div>
                    <h3>Prisma Limingantulli</h3>
                    <h3>address here</h3>
                </div>
            )
        case 4:
            return (
                <div>
                    <h3>Lidl City Center</h3>
                    <h3>address here</h3>
                </div>
            )
        case 5:
            return (
                <div>
                    <h3>Citymarket Rusko</h3>
                    <h3>address here</h3>
                </div>
            )
    }
};