import { Directive, Input, OnInit } from "@angular/core";

@Directive({ selector: "tag-input[fixAnimation]" })
export class TagInputAnimationFixDirective implements OnInit {
  @Input("fixAnimation") tagInput: any;

  ngOnInit() {
    this.tagInput.animationMetadata = {
      value: "in",
      params: {
        enter: "250ms",
        leave: "150ms"
      }
    };
  }
}
