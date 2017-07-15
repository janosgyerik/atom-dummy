'use babel';

import AtomDummyView from './atom-dummy-view';
import { CompositeDisposable } from 'atom';

export default {

  atomDummyView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomDummyView = new AtomDummyView(state.atomDummyViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomDummyView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-dummy:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomDummyView.destroy();
  },

  serialize() {
    return {
      atomDummyViewState: this.atomDummyView.serialize()
    };
  },

  toggle() {
    console.log('AtomDummy was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
