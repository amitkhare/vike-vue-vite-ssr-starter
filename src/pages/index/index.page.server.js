import GenerateDocumentProps from "$helpers/GenerateDocumentProps"

export const onBeforeRender = async (pageContext) => {

  const pageProps = {};

  return {
    pageContext: {
      pageProps,
      documentProps: GenerateDocumentProps({
        title: 'hello',
        description: 'world',
        // cover_image: null,
        // type: 'article',
        // url:'http://localhost:3000/works',
        locale: 'hi'
      }),
    },
  };
};
