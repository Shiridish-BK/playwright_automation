Feature: Sauce Demo Login and Inventory
    As a Sauce Demo User
    I want to log in and reach the inventory page
    So that I can browse products

    Background:
        Given I am on the Sauce Demo login page
    
    @smoke
    Scenario: Standard user logs in and see the inventory
        When I log in with username "standard_user" and password "secret_sauce"
        Then the inventory page should be loaded
        And I should see 6 inventory items

    @regression
    Scenario Outline: Valid Sauce Demo users can log in and reach inventory
        When I log in with username "<username>" and password "secret_sauce"
        Then the inventory page should be loaded

        Examples:
            | username |
            | standard_user |
            | problem_user |
            | performance_glitch_user |