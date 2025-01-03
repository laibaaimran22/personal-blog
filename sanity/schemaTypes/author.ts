import { defineField } from "sanity";

export default {
    name: "author",
    title: "Author",
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            type: 'string',
            title: 'Name',
        }),
        defineField({
            name: 'slug',
            type: 'slug', // for navigation and queries
            options: { source: 'name'} // to generate slug for the name field
        }),
        defineField({
            name: 'image',
            title: 'Profile Image',
            type: 'image',
            options: { hotspot: true} // allow you to crop img
        })
    ]  
}