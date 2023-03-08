// ==UserScript==
// @name         Passaporto Tweaker
// @version      0.1
// @description  a script to understand better the availability when requesting a new passport in Italy
// @author       giorgiodalessandro@aol.com
// ==/UserScript==

(function() {
    'use strict';

    if (!window.location.href.startsWith("https://www.passaportonline.poliziadistato.it/CittadinoAction.do?codop=resultRicercaRegistiProvincia")) return undefined;
    if (!document?.getElementById('infos')?.children[2].children?.length) return undefined;

    let table = document?.getElementById('infos')?.children[2].children

    const toSkip = [
        "COMMISSARIATO MONTE MARIO",
        "COMMISSARIATO PRENESTINO",
        "COMMISSARIATO LIDO DI ROMA"
    ];

    for (let i = 0; i < table?.length; i++) {
        let iteration = table?.item(i);

        const rowCity = iteration?.children?.item(0)?.innerText
        const rowProvince = iteration?.children?.item(3);
        const rowAvailability = iteration?.children?.item(5);
        const rowHref = iteration?.children.item(6)?.children[0]?.getAttribute('href')?.split("data=");
        
        if (rowAvailability?.innerHTML == "No") {
            iteration.innerHtml = '';
            continue;
        }
        
        if (
            rowProvince?.innerHTML != "ROMA" ||
            rowAvailability?.innerHTML != "Si" ||
            !rowHref ||
            !rowAvailability ||
            !!toSkip.find(e => e == rowCity)
        ) {
            document.getElementById(iteration.id).innerHTML = '';
            continue;
        }

        rowAvailability.innerHTML = rowHref[1];
    }
    console.log("website tweaked")
})();
