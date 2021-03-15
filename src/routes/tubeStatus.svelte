<script lang="ts">
    import { onMount } from 'svelte';
    import { getLineBGColor, getLineTextColor } from '../helpers/color';

    let statuses: any = undefined;
    let errorMessage: string = '';

    async function getAllLineStatuses() {
        try {
            const response = await fetch(`https://api.tfl.gov.uk/Line/Mode/tube/Status?app_key=985c2eea87a14961b317643a4bf4de60`);
            statuses = await response.json();
        } catch (e) {
            errorMessage = 'Could not fetch data, click <a href="/">here</a> to refresh!';
        }
    }

    onMount(() => {
        getAllLineStatuses();
        return () => {};
    });
</script>

<main>
    <div id="status">
        {#if statuses}
            <table>
                {#each statuses as line}
                    <tr>
                        <td style="color:{getLineTextColor(line.id || '')}; background-color: {getLineBGColor(line.id || '')}">
                            {line.name}
                        </td>
                        <td>
                            {line.lineStatuses[0].statusSeverityDescription}
                        </td>
                    </tr>
                {/each}
            </table>
        {/if}
    </div>
</main>

<style lang="less">
    @import '../assets/css/colors.less';
    @import '../assets/css/tfl.less';

    #status {
        height: calc(100% - 40px);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: max-content;
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
</style>
