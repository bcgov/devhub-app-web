package spec

import org.junit.runner.RunWith
import org.junit.runners.Suite

@RunWith(Suite)
@Suite.SuiteClasses([
  A_HomePageSpec.class,
  B_CardsSpec.class
])

class CustomJUnitSpecRunner {
}
