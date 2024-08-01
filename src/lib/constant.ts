
export const gridLayout = {
    fourItemStyle: {
        styleOne: {
            container: {
                gridTemplateColumns: '2fr 1fr 1.5fr',
                gridTemplateRows: 'repeat(2, 1fr)',
            },
            children: [
                { gridArea: '1 / 1 / 3 / 2' },
                { gridArea: '1 / 2 / 3 / 3' },
                { gridArea: '1 / 3 / 2 / 4' },
                { gridArea: '2 / 3 / 3 / 4' }
            ]
        }
    },
    threeItemsStyle: {
        styleOne: {
            container: {
                gridTemplateColumns: '1.5fr 1fr',
                gridTemplateRows: 'repeat(2, 1fr)',
            },
            children: []
        }
    },
    twoItemsStyle: {
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
    },
    oneItemStyle: {
        gridTemplateColumns: '1fr',
        gridTemplateRows: '1fr',
    }
}