//
//  AppDelegate.h
//  com.augraph.democrazy
//
//  Created by Audrey MARTEL on 01/04/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "DemocrazyViewController.h"
@interface AppDelegate : UIResponder <UIApplicationDelegate>{
    DemocrazyViewController *viewController;
}


@property (strong, nonatomic) UIWindow *window;
@property (nonatomic, retain) IBOutlet DemocrazyViewController *viewController;

@end
