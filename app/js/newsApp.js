"use strict";

class NewsApp{

	constructor(config){
		this.newsUrl = config.newsUrl;
		this.newsElementId = config.newsElementId;
		this.htmlHelper = new HtmlHelper();
		this.templateBuilder = new TemplateBuilder(this.htmlHelper);
	}

	run(){
		let ErrorMessage = "Ooops... Error occured.";
		let WarningMessage = "WarningMessage";

		fetch(this.newsUrl)
			.then(response => response.json())
			.then(jsonResponse => {

				let articles = jsonResponse.articles.map(article => this._getObjProxy(article));

				let artcilesHtml = this.templateBuilder.getArticlesHtml(articles);
				//throw new Error();

				this.htmlHelper.fillElement(this.newsElementId, artcilesHtml || this.templateBuilder.getInfoHtml(WarningMessage));
			})
			.catch(error => {
				this.htmlHelper.fillElement(this.newsElementId, this.templateBuilder.getErrorHtml(ErrorMessage));
				console.log(error.message);
			});
	}

	_getObjProxy(obj){
		return new Proxy(obj, {
			get(target, prop) {
			    if (!target[prop]){
			    	return undefined;
			    }
			    if (prop == 'publishedAt') {
                    let date = new Date(target[prop]);
                    return date.toLocaleString()
                }
			    return target[prop];
  			}
		});
	}
}