
import {client, Query,Field } from '@tilework/opus';

client.setEndpoint('http://localhost:4000');

const query = (name) => {
  const query = new Query('category', true)
.addArgument('input', 'CategoryInput!', { title: name })
.addField('name')
.addField(
            new Field('products', true)
              .addFieldList(['id', 'category', 'name', 'brand', 'inStock'])
              .addField(
                new Field('attributes', true)
                  .addFieldList(['id', 'type', 'name'])
                  .addField(new Field('items', true).addFieldList(['displayValue', 'value', 'id']))
              )
              .addField(new Field('gallery', true))
              .addField(
                new Field('prices', true)
                  .addField('amount')
                  .addField(new Field('currency', true).addFieldList(['label', 'symbol']))
              )
          )
        return query
        }


export default query;


