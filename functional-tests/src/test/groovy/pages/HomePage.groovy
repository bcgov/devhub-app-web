package pages

import geb.Page

class HomePage extends Page {
  static content = {
    LearnButton (wait: true) {$("a", id: "dh-main-nav-0")}
    DoButton (wait: true) {$("a", id: "dh-main-nav-1")}
    DeliveryButton (wait: true) {$("a", id: "dh-main-nav-2")}
  }
}