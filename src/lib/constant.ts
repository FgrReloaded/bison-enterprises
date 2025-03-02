
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

export const gridNames = [
    "row-span-2 md:col-span-1",
    "row-span-2 md:col-start-2 md:col-end-3",
    "md:col-start-3 md:row-start-1",
    "md:col-start-3 md:row-start-2"
]

export const states = [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jammu and Kashmir",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttarakhand",
        "Uttar Pradesh",
        "West Bengal",
        "Andaman and Nicobar Islands",
        "Chandigarh",
        "Dadra and Nagar Haveli",
        "Daman and Diu",
        "Delhi",
        "Lakshadweep",
        "Puducherry"
]