import { Component } from "@stencil/core";

@Component({
	tag: "kanban-board",
	styleUrl: "kanban-board.scss"
})
export class KanbanBoard {
	render() {
		return (
			<section class="holder">
				<header>
					<h1>Kanban Board</h1>
				</header>

				<main class="buckets-holder">
					<kb-bucket />
					<kb-bucket />
					<kb-bucket />
					<kb-bucket />
					<kb-bucket />
					<kb-bucket />
					<kb-bucket />
				</main>
				<button class="fab add-bucket">+</button>
			</section>
		);
	}
}
