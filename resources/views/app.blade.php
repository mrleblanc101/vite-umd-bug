<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes

        {{--
            TEST 1: `<script type="module">` is executed last
            console.log('BEFORE GTM INIT') is logged after after console.log('GTM INIT')
            This is a problem since GTM will trigger before the plugin
        --}}
        {{-- @vite(['resources/js/app.js', 'resources/js/test1.js', "resources/js/Pages/{$page['component']}.vue"]) --}}



        {{--
            TEST 2: npm run build has build time error
            > Unable to locate file in Vite manifest: node_modules/vanilla-cookieconsent/dist/cookieconsent.umd.js.
        --}}
        {{-- @vite(['resources/js/app.js', "resources/js/Pages/{$page['component']}.vue"])
        <script src="{{ Vite::asset("node_modules/vanilla-cookieconsent/dist/cookieconsent.umd.js") }}"></script>
        <script src="{{ Vite::asset("resources/js/test2.js") }}"></script> --}}



        {{--
            TEST 3: npm run build has runtime error
            > Uncaught ReferenceError: CookieConsent is not defined
            Vite production build wrap CookieConsent so it's not available on window.CookieConsent
         --}}
        {{-- @vite(['resources/js/app.js', "resources/js/Pages/{$page['component']}.vue"])
        <script src="{{ Vite::asset("node_modules/vanilla-cookieconsent/dist/cookieconsent.umd.js?commonjs-entry") }}"></script>
        <script src="{{ Vite::asset("resources/js/test3.js") }}"></script> --}}



        {{--
            TEST 4: npm run dev has runtime error
            Uncaught SyntaxError: Cannot use import statement outside a module
        --}}
        {{-- @vite(['resources/js/app.js', "resources/js/Pages/{$page['component']}.vue"])
        <script src="{{ Vite::asset("resources/js/test4.js") }}"></script> --}}



        {{--
            TEST 5: Current workaround
         --}}
         @vite(['resources/js/app.js', "resources/js/Pages/{$page['component']}.vue"])
        <script>{!! Vite::content('resources/js/test4.js') !!}</script>




        <script>console.log('GTM INIT', window.CookieConsent)</script>
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
