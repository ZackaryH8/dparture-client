<script>
    import { Router } from 'svelte-router-spa';
    import { routes } from './routes';

    import Footer from './components/footer.svelte';
</script>

<Router {routes} />
<Footer />
