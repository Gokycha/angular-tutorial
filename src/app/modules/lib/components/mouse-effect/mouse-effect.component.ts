import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { bubbleCursor, characterCursor, clockCursor, emojiCursor, fairyDustCursor, followingDotCursor, ghostCursor, rainbowCursor, snowflakeCursor, springyEmojiCursor, textFlag, trailingCursor } from 'cursor-effects';

@Component({
  selector: 'app-mouse-effect',
  standalone: false,
  templateUrl: './mouse-effect.component.html',
  styleUrl: './mouse-effect.component.scss'
})
export class MouseEffectComponent implements AfterViewInit {

  mouseEffect: any;
  isDropdownVisible = false;
  dropdownX = 0;
  dropdownY = 0;

  listMouseEffect = [
    {
      name: 'Ghost',
      effect: () => this.mouseEffect = ghostCursor(),
    },
    {
      name: 'Text Flag',
      effect: () => this.mouseEffect = textFlag({ text: "hello world 😊", color: "#FF6800" }),
    },
    {
      name: 'Emoji Cursor',
      effect: () => this.mouseEffect = emojiCursor({ emoji: ["👻", "👽", "💕", "😎"] }),
    },
    {
      name: 'Clock Cursor',
      effect: () => this.mouseEffect = clockCursor(),
    },
    {
      name: 'Bubble Cursor',
      effect: () => this.mouseEffect = bubbleCursor(),
    },
    {
      name: 'Character Cursor',
      effect: () => this.mouseEffect = characterCursor(),
    },
    {
      name: 'Fairy Dust Cursor',
      effect: () => this.mouseEffect = fairyDustCursor(),
    },
    {
      name: 'Following Dot Cursor',
      effect: () => this.mouseEffect = followingDotCursor(),
    },
    {
      name: 'Rainbow Cursor',
      effect: () => this.mouseEffect = rainbowCursor(),
    },
    {
      name: 'Snowflake Cursor',
      effect: () => this.mouseEffect = snowflakeCursor(),
    },
    {
      name: 'Springy Emoji Cursor',
      effect: () => this.mouseEffect = springyEmojiCursor(),
    },
    {
      name: 'Trailing Cursor',
      effect: () => this.mouseEffect = trailingCursor(),
    }
  ];

  constructor(
    private elementRef: ElementRef,
  ) { }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.addEventListener('mousedown', (event: any) => {
      if (!event.target?.closest('.dropdown-menu')) {
        if (event.button === 0) {
          this.openDropdown(event);
        }
      }
    });
  }

  changeMouseEffect(effect: Function) {
    this.mouseEffect && this.mouseEffect.destroy();
    effect();
    this.isDropdownVisible = false;
  }

  openDropdown(event: MouseEvent) {
    this.isDropdownVisible = !this.isDropdownVisible;
    this.dropdownX = event.clientX; // Lấy tọa độ X
    this.dropdownY = event.clientY; // Lấy tọa độ Y
  }
}