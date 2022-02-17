import { Component, ViewChild } from '@angular/core';
import { Node } from './models/node.model';
import { TreeNodeComponent } from './tree-node/tree-node.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild(TreeNodeComponent, { static: false }) node: TreeNodeComponent;
  title = 'FOLDER STRUCTURE';
  rootNode: Node = {
    id: '',
    name: '',
    type: 'folder',
    children: []
  };

  ngOnInit(): void {
  }

  //  opens form to add folder on root
  addOnRoot() {
    this.node.showNodeForm('folder', this.rootNode.id);
  }
}

