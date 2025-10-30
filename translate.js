
const t_supported = ["en", "ru", "ar"];

async function loadLocale(locale){
	locale = locale_dir + "/" + locale + ".txt";
	try {
		let data = await (await fetch(locale)).text();
		let dict = {};
		let lines = data.split('\n');
		let regex = /^\s*([\w-]+)\s+"([^"]+)"\s*$/
		let prefix = []
		lines.forEach(line => {
			line = line.trim();
			if (line=='' || line.startsWith("//")) return;
			if (line.trimStart().startsWith('{')){
				prefix.push(line.substring(1))
				return;
			}
			if (line.trimStart().startsWith('}')){
				prefix.pop();
				return;
			}
			let match = line.match(regex);
			if (match) {
				dict[prefix.reduce((a,b)=>a+b,"") + match[1]] = match[2];
			} else {
				console.warn("From translate.js: match failed for line: " + line);
			}
		})
		return dict;
	} catch (err) {
		console.error("Error from translate.js: " + err.message);
		return {};
	}
}

let locale = null;
let dict_locale = null;
let dict = null;
let locale_dir = null;

function getLocale(){
	if (locale===null){
		if (localStorage["locale"]){
			locale = localStorage["locale"]
		} else
		locale = navigator.language.split('-')[0]
		if(!t_supported.includes(locale)){
			console.warn("translate.js: locale not supported: " + locale + " , switching to 'en'");
			locale = "en"
		}
	}
	return locale;
}

// async function t(key){
// 	if (dict == null){
// 		await reloadLocales();
// 	}
// 	return dict[key];
// }

async function getT(){
	if (dict_locale != getLocale() || dict == null){	
		await reloadLocales();
	}
	return key => {
		if(dict[key]) return dict[key]; else return "?"+locale+":"+key+"?";
	};
}

async function reloadLocales(){
	if (locale_dir==null){
		console.error("locale_dir is null");
	}
	dict = await loadLocale(getLocale());
	for(const e of document.querySelectorAll("[data-t]")){
		e.textContent = dict[e.getAttribute("data-t")];
	}
	dict_locale = locale;
}

document.addEventListener("DOMContentLoaded",async () => {
	locale_dir = document.querySelector("script[src='/translate.js']").getAttribute("data-dir")
	await reloadLocales().catch(err => {
		console.error("translate.js, reloadLocales failed: " + err);
	});
	let dd = document.getElementById("language-selector");
	if (dd){
		if(localStorage["locale"]){
			dd.value = localStorage["locale"];
		}
		dd.addEventListener("change", languageSelector)
	}
})

function languageSelector(){
	let dd = document.getElementById("language-selector");
	let val = dd.value;
	if (val=="*"){
		localStorage.removeItem("locale");
	} else {
		localStorage["locale"] = val;
	}
	location.reload();
}