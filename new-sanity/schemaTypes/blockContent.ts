// ./src/sanity/schemaTypes/blockContent.ts
import {defineType, defineArrayMember} from 'sanity'

export const blockContentType = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    // Text Blocks
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Large Text', value: 'large'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Code', value: 'code'},
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [{title: 'URL', name: 'href', type: 'url'}],
          },
          // Uncomment below to add a custom font size annotation if needed
          // {
          //   title: "Font Size",
          //   name: "fontSize",
          //   type: "object",
          //   fields: [
          //     {
          //       name: "value",
          //       title: "Value",
          //       type: "number",
          //       validation: (Rule) => Rule.min(8).max(72),
          //     },
          //     {
          //       name: "unit",
          //       title: "Unit",
          //       type: "string",
          //       options: {
          //         list: [
          //           { title: "Pixels (px)", value: "px" },
          //           { title: "Rems (rem)", value: "rem" },
          //         ],
          //       },
          //       initialValue: "px",
          //     },
          //   ],
          // },
        ],
      },
    }),

    // Image Block
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: 'Alternative Text'}],
    }),

    // Code Block
    defineArrayMember({
      type: 'object',
      name: 'code',
      title: 'Code Block',
      fields: [
        {
          name: 'language',
          title: 'Language',
          type: 'string',
          options: {
            list: [
              {title: 'JavaScript', value: 'javascript'},
              {title: 'TypeScript', value: 'typescript'},
              {title: 'Python', value: 'python'},
              {title: 'HTML', value: 'html'},
              {title: 'CSS', value: 'css'},
              {title: 'JSON', value: 'json'},
            ],
          },
        },
        {
          name: 'code',
          title: 'Code',
          type: 'text',
          rows: 10,
        },
      ],
    }),

    // Table Block
    defineArrayMember({
      type: 'object',
      name: 'table',
      title: 'Table',
      fields: [
        {
          name: 'rows',
          title: 'Rows',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'columns',
                  title: 'Columns',
                  type: 'array',
                  of: [{type: 'string'}],
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
})
