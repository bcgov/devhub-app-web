package spec

import geb.spock.GebReportingSpec
import spock.lang.*


import pages.*



@Title("MDS-LoginPage")
@Narrative("I can go to home page")
@Stepwise
class  A_HomePageSpec extends GebReportingSpec {
    def "I see list of places in the home page"(){
        when:"I go to the homepage"
        to HomePage

        then: "I see destinations"
        Buttons

    }
}