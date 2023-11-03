import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Idea } from 'src/app/models/idea.model';
import { DataService } from 'src/app/services/data.service';
import { IdeaService } from 'src/app/services/idea.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-side-content',
  templateUrl: './side-content.component.html',
  styleUrls: ['./side-content.component.css']
})
export class SideContentIdeaComponent implements OnInit {
  @Input() idea: Idea | undefined
  ideaPrivacy: boolean = false
  isEditorMode: boolean = false

  constructor(
    private ideaService: IdeaService,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    (this.idea && this.idea.publicState) ? this.ideaPrivacy = this.idea?.publicState : this.ideaPrivacy = false
  }

  truncate() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.idea)
        this.ideaService.deleteIdea(this.idea.idea_id)

        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )

        this.router.navigate(['/problem'])
      }
    })
  }

  privacy(bool: boolean) {
    const privacy = {
      publicState: bool
    }

    if (this.idea) {
      this.ideaService.updateIdea(this.idea.idea_id, privacy).then(() => {
        this.ideaPrivacy = bool
      })
    }
  }

  editorMode() {
    if (this.idea) {
      this.dataService.setEditorMode(true)
      this.dataService.setRecieveIdea([this.idea.ideaHeader || '', this.idea.key || '', this.idea.board || ''])
      this.isEditorMode = true
    }
  }

  confirmEditor() {
    const form = this.dataService.getRecieveIdea()
    const idea = {
      ideaHeader: form[0],
      key: form[1],
      board: form[2]
    }

    if (this.idea)
    this.ideaService.updateIdea(this.idea.idea_id, idea).then((data) => {
      Swal.fire({
        icon: 'success',
        title: 'Idea updated',
        text: "Now your idea are update successfully",
        showConfirmButton: false,
        timer: 1500
      })

      this.isEditorMode = false
      this.dataService.setEditorMode(false)
      this.dataService.setUpdateIdea(data)
      this.dataService.setOnTrack(1)
    })
  }

  cancelEditor() {
    this.isEditorMode = false
    this.dataService.setEditorMode(false)
  }
}
