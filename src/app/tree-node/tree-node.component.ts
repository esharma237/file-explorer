import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Node } from '../models/node.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss']
})
export class TreeNodeComponent implements OnInit {

  // contains parent node
  @Input() parent: Node;
  // contains current node
  @Input() node: Node;

  @ViewChild('name') inputElement: ElementRef;
  form: FormGroup;

  showAddOptions: boolean = false;
  showForm: boolean = false;

  constructor(
    private fb: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      type: ['folder']
    });
  }

  // shows the form to add node
  showNodeForm(type: string, nodeId: string): void {
    this.form.get('type').setValue(type);
    this.showAddOptions = false;
    this.showForm = true;
    // this is done to focus on the input as soon as it appears on screen,
    // it can also be done by setTimeout()
    this.changeDetectorRef.detectChanges();
    this.inputElement.nativeElement.focus();
  }

  // adds the node in children array on current node
  submit(): void {
    const nodeName = this.form.get('name').value.trim();
    if (nodeName) {
      const data: Node = {
        id: this.getNodeId(),
        type: this.form.get('type').value,
        name: nodeName,
        children: []
      };
      this.node.children?.push(data);
      this.showForm = false;
      this.reset();
    }
  }

  // removes the node from children array of parent node
  remove(): void {
    const index = this.parent.children.findIndex((x) => x.id === this.node.id);
    if (index > -1) {
      this.parent.children.splice(index, 1);
    }
  }

  // shows options to add folder & file
  showOptions(id: string): void {
    this.showForm = false;
    this.showAddOptions = true;
  }

  reset(): void {
    this.form.get('name').setValue('');
  }

  // creates and returns the node id for new node
  private getNodeId(): string {
    const timestamp = Math.floor(Date.now() / 1000);
    return timestamp.toString();
  }

}
