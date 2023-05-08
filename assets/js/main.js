

function getTitleFromPageAndTitle(f) {
    let title = f.page.title;
    if(f.page.title && f.site.title) {
        title+= " - ";
    }
    title += f.site.title

    return title;
}

function getGeneratedHtml(f) {

    return (
        `<html lang="${f.site.lang}">
    <head prefix="og: http://ogp.me/ns#">

        <title>${getTitleFromPageAndTitle(f)}</title>

        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        
        <meta name="robots" content="${f.more.robots}">
        <meta name="target" content="${f.more.robots}">

        <meta name="author" content="${f.more.author}">
        <meta name="owner" content="${f.more.owner}">

        <meta name="url" content="${f.site.url}">
        <meta name="identifier-URL" content="${f.site.url}">
        <link rel="canonical" href="${f.page.url}" />

        <meta name="subject" content="${f.more.subject}">
        <meta name="description" content="${f.page.description}" />

        <meta property="og:title" content="${f.page.title}" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="${f.page.description}" />
        <meta property="og:site_name" content="${f.site.title}" />
        <meta property="og:url" content="${f.page.url}" />
        <meta property="og:locale" content="${f.site.lang}" />
        <meta property="og:image" content="${f.page.heroUrl}" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="${f.page.url}">
        <meta name="twitter:title" content="${getTitleFromPageAndTitle(f)}" />
        <meta name="twitter:description" content="${f.page.description}" />
        <meta name="twitter:image" content="${f.page.heroUrl}" />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="${f.page.title}" />
        <meta name="apple-mobile-web-app-status-bar-style" content="${f.more.themeColor}">
        <meta name="theme-color" content="${f.more.themeColor}">

    </head>
</html>
`
    );
}


document.addEventListener('alpine:init', () => {
    Alpine.data('appForm', () => ({
        viewDisplayed: 'preview',
        copied: false,
        copiedTimeout: 2,

        form: {
            site: {},
            page: {},
            more: {}
        },


        html: "",

        init() {
            this.html = hljs.highlight(getGeneratedHtml(this.form), {language: 'html'}).value ;

            this.$watch('form', () => {
                this.html = hljs.highlight(getGeneratedHtml(this.form), {language: 'html'}).value ;
            })
        },

        toggleView()
        {
          this.viewDisplayed = this.viewDisplayed === "htmlCode" ? "preview" : "htmlCode";
        },

        copyTimeout()
        {
            setTimeout(()=>this.copied=false, this.copiedTimeout * 1000);
        },

        copyContent() {
            navigator.permissions.query({name: "clipboard-write"}).then(result => {
                if (result.state == "granted" || result.state == "prompt") {
                    navigator.clipboard.writeText(getGeneratedHtml(this.form)).then(()=>{
                        this.copied = true;
                        this.copyTimeout();
                    }, function() {
                        this.copied = false;
                    });
                }
            });
        }
    }))

    Alpine.data('menu', () => ({
        isOpen: false,

        toggleMenu() {
            this.isOpen = ! this.isOpen
        },

        closeMenu() {
            this.isOpen = false
        },
    }))
})