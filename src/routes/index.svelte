<script>
	import DpartureLogo from '../components/common/dpartureLogo.svelte';
</script>

<svelte:head>
	<title>Sapper project template</title>
</svelte:head>


<div id="main-container">
	<DpartureLogo />

	<div class="split">
		<a class="button" href="#/nr">
			<img src="img/logos/NationalRail.svg" alt="National Rail Logo" draggable="false" />
			<p>National<br />Rail</p>
		</a>
		<a class="button" href="#/tube">
			<img src="img/logos/Underground.svg" alt="London Underground Logo" draggable="false" />
			<p>London<br />Underground</p>
		</a>
	</div>
</div>


<style lang="less">
	@import 'static/css/colors.less';
	@import 'static/css/tfl.less';

	* {
		color: #fff;
		margin-block-start: 0;
		margin-block-end: 0;
	}

	main {
		height: calc(100% - 40px);
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 100%;
		text-align: center;
	}

	#main-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 450px;
		height: 340px;
		padding: 5px;
		border-radius: 5px;
		background-color: #333333;

		.split {
			width: 100%;
			padding: 5px;
			display: flex;
			justify-content: space-evenly;

			img {
				height: 100px;
			}

			p {
				text-align: center;
				margin-top: 5px;
			}
		}
	}

	.button {
		padding: 10px;
		border-radius: 5px;
		text-decoration: none;
		cursor: pointer;
	}

	.button:hover {
		text-decoration: none;
		background-color: #424242;
	}

	@media only screen and (max-width: 600px) {
		#main-container {
			width: 95%;
		}
	}
</style>