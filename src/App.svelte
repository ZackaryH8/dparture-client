<script>
    import Router from 'svelte-spa-router';
    import { routes } from './routes';

    import Footer from './components/footer.svelte';
</script>

<body>
    <Router {routes} />
    <Footer />
</body>
