console.log('BEFORE GTM INIT');
window.dataLayer = window.dataLayer || [];
function gtag() {
    window.dataLayer.push(arguments);
}

gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'denied',
});

if (CookieConsent.getCookie('categories', 'cc_cookie')) {
    const acceptedCategories = CookieConsent.getCookie('categories', 'cc_cookie') || [];
    gtag('consent', 'update', {
        functionality_storage: acceptedCategories.includes('functionality') ? 'granted' : 'denied',
        ad_storage: acceptedCategories.includes('marketing') ? 'granted' : 'denied',
        ad_user_data: acceptedCategories.includes('marketing') ? 'granted' : 'denied',
        ad_personalization: acceptedCategories.includes('marketing') ? 'granted' : 'denied',
        analytics_storage: acceptedCategories.includes('analytics') ? 'granted' : 'denied',
        personalization_storage: acceptedCategories.includes('personalization') ? 'granted' : 'denied',
        security_storage: acceptedCategories.includes('security') ? 'granted' : 'denied',
    });
}

window.addEventListener('load', function () {
    CookieConsent.run({
        guiOptions: {
            consentModal: {
                layout: 'box wide',
                position: 'bottom right',
                equalWeightButtons: true,
                flipButtons: true,
            },
            preferencesModal: {
                layout: 'box',
                position: 'right',
                equalWeightButtons: true,
                flipButtons: false,
            },
        },
        categories: {
            necessary: {
                readOnly: true,
            },
            marketing: {},
            analytics: {},
            functionality: {},
            personalization: {},
            security: {},
        },
        language: {
            default: document.documentElement.getAttribute('lang'),
            translations: {
                en: {
                    consentModal: {
                        title: 'Cookie settings',
                        description:
                            'This website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only after consent.',
                        acceptAllBtn: 'Accept all',
                        acceptNecessaryBtn: 'Reject all',
                        showPreferencesBtn: 'Manage preferences',
                        footer: '<a href="/privacy-policy">Privacy Policy</a>\n<a href="/terms-and-conditions">Terms and conditions</a>',
                    },
                    preferencesModal: {
                        title: 'Cookie settings',
                        acceptAllBtn: 'Accept all',
                        acceptNecessaryBtn: 'Reject all',
                        savePreferencesBtn: 'Save preferences',
                        closeIconLabel: 'Close modal',
                        serviceCounterLabel: 'Service|Services',
                        sections: [
                            {
                                title: null,
                                description:
                                    'We use cookies to help you browse effectively and perform certain features. You will find detailed information on all cookies under each category of consent below.',
                            },
                            {
                                title: 'Strictly Necessary Cookies <span class="pm__badge">Always Enabled</span>',
                                description:
                                    'The necessary cookies are crucial for the basic functions of the website and it will not work as planned without them. These cookies do not store any personally identifiable data.',
                                linkedCategory: 'necessary',
                            },
                            {
                                title: 'Functionality Cookies',
                                description:
                                    'Functional cookies make it possible to perform certain features such as sharing the content of the website on social media platforms, the collection of comments and other third-party features.',
                                linkedCategory: 'functionality',
                            },
                            {
                                title: 'Analytics Cookies',
                                description:
                                    'Analytical cookies are used to understand how visitors interact with the website. These cookies help provide information on the number of visitors, the rebound rate, the traffic source, etc.',
                                linkedCategory: 'analytics',
                            },
                            {
                                title: 'Advertisement Cookies',
                                description:
                                    'Advertising cookies are used to provide visitors with personalized advertisements based on the pages previously visited and analyze the efficiency of the advertising campaign.',
                                linkedCategory: 'marketing',
                            },
                        ],
                    },
                },
                fr: {
                    consentModal: {
                        title: 'Préférences de cookies',
                        description:
                            "Ce site web utilise des cookies essentiels pour assurer son bon fonctionnement et des cookies de suivi pour comprendre comment vous interagissez avec lui. Ces derniers ne seront installés qu'après consentement.",
                        acceptAllBtn: 'Tout accepter',
                        acceptNecessaryBtn: 'Tout rejeter',
                        showPreferencesBtn: 'Gérer les préférences',
                        footer: '<a href="/fr/politique-de-confidentialite">Politique de confidentialité</a>\n<a href="/fr/termes-et-conditions">Termes et conditions</a>',
                    },
                    preferencesModal: {
                        title: 'Préférences de cookies',
                        acceptAllBtn: 'Tout accepter',
                        acceptNecessaryBtn: 'Tout rejeter',
                        savePreferencesBtn: 'Sauvegarder les préférences',
                        closeIconLabel: 'Fermer la modale',
                        serviceCounterLabel: 'Services',
                        sections: [
                            {
                                title: null,
                                description:
                                    'Nous utilisons des cookies pour vous aider à naviguer efficacement et à exécuter certaines fonctionnalités. Vous trouverez des informations détaillées sur tous les cookies sous chaque catégorie de consentement ci-dessous.',
                            },
                            {
                                title: 'Cookies strictement nécessaires <span class="pm__badge">Toujours Activé</span>',
                                description:
                                    'Les cookies nécessaires sont cruciaux pour les fonctions de base du site Web et celui-ci ne fonctionnera pas comme prévu sans eux. Ces cookies ne stockent aucune donnée personnellement identifiable.',
                                linkedCategory: 'necessary',
                            },
                            {
                                title: 'Cookies de fonctionnalités',
                                description:
                                    "Les cookies fonctionnels permettent d'exécuter certaines fonctionnalités telles que le partage du contenu du site Web sur des plateformes de médias sociaux, la collecte de commentaires et d'autres fonctionnalités tierces.",
                                linkedCategory: 'functionality',
                            },
                            {
                                title: "Cookies d'analytiques",
                                description:
                                    'Les cookies analytiques sont utilisés pour comprendre comment les visiteurs interagissent avec le site Web. Ces cookies aident à fournir des informations sur le nombre de visiteurs, le taux de rebond, la source de trafic, etc.',
                                linkedCategory: 'analytics',
                            },
                            {
                                title: 'Cookies publicitaires',
                                description:
                                    "Les cookies de publicité sont utilisés pour fournir aux visiteurs des publicités personnalisées basées sur les pages visitées précédemment et analyser l'efficacité de la campagne publicitaire.",
                                linkedCategory: 'marketing',
                            },
                        ],
                    },
                },
            },
        },
        onFirstConsent: (...args) => {
            manageConsent(args);
            window.dataLayer.push({ event: 'consent_ready' });
        },
        onChange: (...args) => {
            manageConsent(args);
            window.dataLayer.push({ event: 'consent_update' });
        },
    });
});

function manageConsent() {
    gtag('consent', 'update', {
        functionality_storage: CookieConsent.acceptedCategory('functionality') ? 'granted' : 'denied',
        ad_storage: CookieConsent.acceptedCategory('marketing') ? 'granted' : 'denied',
        ad_user_data: CookieConsent.acceptedCategory('marketing') ? 'granted' : 'denied',
        ad_personalization: CookieConsent.acceptedCategory('marketing') ? 'granted' : 'denied',
        analytics_storage: CookieConsent.acceptedCategory('analytics') ? 'granted' : 'denied',
        personalization_storage: CookieConsent.acceptedCategory('personalization') ? 'granted' : 'denied',
        security_storage: CookieConsent.acceptedCategory('security') ? 'granted' : 'denied',
    });
}
