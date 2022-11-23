import { Query,Field } from '@tilework/opus';
   
   
   const currenciesQuery =  new Query('currencies', true)
      .addField(new Field('symbol', true))
      .addField(new Field('label', true));

      export default currenciesQuery