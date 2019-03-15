import { Component, State } from "@stencil/core";

@Component({
	tag: "kb-bucket",
	styleUrl: "kb-bucket.scss"
})
export class KBBucket {
	@State() dragging: boolean;
	@State() draggedElement: HTMLElement;
	placeholderDiv: HTMLElement;
	constructor() {
		this.handleDragOver = this.handleDragOver.bind(this);
		this.handleDragEnter = this.handleDragEnter.bind(this);
		this.handleDragLeave = this.handleDragLeave.bind(this);
		this.handleDrop = this.handleDrop.bind(this);
		this.handleDragEnd = this.handleDragEnd.bind(this);
	}

	findIfParentExists(childNode, parentNode) {
		if (childNode === parentNode) return true;
		if (!childNode.parentNode) {
			return false;
		} else {
			return this.findIfParentExists(childNode.parentNode, parentNode);
		}
	}

	handleDragEnter(e) {
		if (this.findIfParentExists(e.target, this.draggedElement)) return;
	}

	handleDragEnd(e) {
		e.preventDefault();
		e.stopPropagation();
		// this.dragging = false;
		console.log("drag end");
	}

	handleDragLeave(e) {
		e.preventDefault();
		e.stopPropagation();
		this.dragging = false;
		console.log("drag leave");
	}

	getBoundingTaskItem(node: HTMLElement) {
		let tempNode = node;
		while (tempNode && tempNode.nodeName !== "KB-TASK") {
			tempNode = tempNode.parentElement;
		}
		return tempNode;
	}
	handleDragOver(e) {
		// Check if the element is being hovered on itself and return
		if (this.findIfParentExists(e.target, this.draggedElement)) return;
		const taskItemTarget = this.getBoundingTaskItem(e.target);
		if (!taskItemTarget) return; // Return if kb-task is not found in the parent of the element. Happens when user hovers on section.tasks gap

		const {
			top: taskItemYDistance,
			height: taskItemHeight
		} = taskItemTarget.getBoundingClientRect();
		const { clientY: cusrorYPosition } = e;
		if (cusrorYPosition - taskItemYDistance > taskItemHeight / 2) {
			console.log("Below");
		} else {
			console.log("Above");
		}
		console.log(
			"drag over",
			cusrorYPosition,
			taskItemYDistance,
			taskItemHeight,
			this.draggedElement.clientHeight
		);
	}

	handleDrop() {
		console.log("drop");
	}

	handleDragStart = e => {
		e.stopPropagation();
		this.draggedElement = e.target as HTMLElement;
		// this.dragging = true;
		const { clientHeight: height } = e.target;
		this.placeholderDiv.style.height = height + "px";
		const { marginTop, marginBottom } = getComputedStyle(e.target);
		this.placeholderDiv.style.marginTop = marginTop;
		this.placeholderDiv.style.marginBottom = marginBottom;
		// this.draggedElement.parentNode.replaceChild(
		// 	this.placeholderDiv,
		// 	this.draggedElement
		// );
		console.log("drag start", y);
	};

	render() {
		return (
			<section class="bucket">
				<h3>ToDo</h3>
				<section
					class={`tasks`}
					// onDragEnter={this.handleDragEnter}
					onDragOver={this.handleDragOver}
					// onDragEnd={this.handleDragEnd}
					// onDragLeave={this.handleDragLeave}
					onDrop={this.handleDrop}
					onDragStart={this.handleDragStart}
				>
					<kb-task draggable />
					<kb-task draggable />
					<kb-task draggable />
					<div
						class="placeholderDiv"
						ref={el => (this.placeholderDiv = el as HTMLElement)}
					/>
				</section>
				<section class="add-task">+ Add Task</section>
			</section>
		);
	}
}
