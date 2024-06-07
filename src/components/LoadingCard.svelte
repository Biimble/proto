<div class="loading-card">
	<div class="loading-content">
		<div class="loading-title">
			<div class="animation"></div>
		</div>
		<div class="loading-subtitle">
			<div class="animation"></div>
		</div>
	</div>
</div>

<style>
	.loading-card {
		position: relative;
		width: 90%;
		height: 120px;
		border-radius: 16px;
		background: #f3f3f3;
		overflow: hidden;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
		animation: background 0.8s linear infinite;
	}

	.loading-content {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 1rem;
		color: #fff;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		overflow: hidden;
	}

	.loading-title {
		width: 70%;
		height: 30px;
		border-radius: 5px;
	}

	.loading-subtitle {
		width: 50%;
		height: 20px;
		border-radius: 5px;
	}

	.loading-title,
	.loading-subtitle {
		position: relative;
		overflow: hidden;
		background: #c5c5c5;
		& .animation {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			transform: translateX(-100%);
			background: linear-gradient(
				90deg,
				rgba(197, 197, 197, 1) 0%,
				rgb(239, 239, 239) 50%,
				rgba(197, 197, 197, 1) 100%
			);
		}
	}

	.animation {
		animation: hey 3s linear infinite;
	}

	@keyframes hey {
		40%,
		100% {
			transform: translateX(100%);
		}
	}

	@keyframes background {
		50% {
			background: #e3e3e3;
		}
	}
</style>
