<main>
    <div id="status">
        {#if statuses}
            <table>
                {#each statuses as line}
                    <tr>
                        <TableData bind:line />
                    </tr>
                {/each}
            </table>
        {/if}
    </div>
</main>

<script lang="ts">
import { onMount } from 'svelte';
import { host } from '../../assets/data/globals';
import TableData from '../../components/status/tableData.svelte';
import type IGetAllLineStatuses from '../../interfaces/getAllLineStatus';

let statuses: IGetAllLineStatuses[] = undefined;
let errorMessage: string = '';

async function getAllLineStatuses() {
    try {
        const data = await fetch(`https://${host}/api/v1/tfl/tube/getAllLineStatuses`);
        statuses = await data.json();
    } catch (e) {
        errorMessage = 'Could not fetch data, click <a href="/">here</a> to refresh!';
    }
}

onMount(() => {
    getAllLineStatuses();

    /* Update the status data */
    const dataInterval = setInterval(() => {
        getAllLineStatuses();
    }, 300000);

    return () => {
        clearInterval(dataInterval);
    };
});
</script>

<style lang="less">
#status {
    height: calc(100vh - 70px);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    text-align: center;
    padding: 15px 0;

    * {
        color: #fff;
    }
}

table {
    width: 40%;
    tr {
        height: 40px;

        td {
            background-color: #424242;
        }
    }
}

@media only screen and (max-width: 600px) {
    #status {
        height: calc(100% - 40px);
    }
    table {
        width: 90%;
    }
}
</style>
