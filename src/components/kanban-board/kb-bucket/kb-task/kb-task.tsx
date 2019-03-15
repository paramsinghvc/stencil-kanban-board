import { Component, Prop } from "@stencil/core";

@Component({
	tag: "kb-task",
	styleUrl: "kb-task.scss"
})
export class KBTask {
	@Prop() isDraggedOver: boolean;
	render() {
		return (
			<section
				class={`task-item ${this.isDraggedOver ? "isDraggedOver" : ""}`}
			>
				<div class="header">
					<p class="pill">Low Priority</p>
				</div>
				<p class="descirption">
					Slide templates for client pitch project
					{/* {Math.random() * 10 > 5
						? "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do"
						: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architectoolorem amet, consectetur adipiscing elit, sed do adipiscing e"} */}
				</p>
				<div class="toolbar">
					<div class="left-buttons">
						<i class="material-icons">comment</i>
						<i class="material-icons">attachment</i>
					</div>
					<div class="right-buttons" />
				</div>
			</section>
		);
	}
}
