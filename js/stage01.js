import TaskModel from './task-model';
import TaskView from './task-view';

document.querySelector('#button').addEventListener('click', () => {
  const title = document.querySelector('#text').value;
  let task = new TaskModel(title, 'test');
  let view = new TaskView();

  view.tag = 'li';
  view.model = task;
  view.template = "`<li>${this.model.title}</li>`";
  view.selector = '#list';
  view.render();
});


