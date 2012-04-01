//
//  DemocrazyViewController.h
//  com.augraph.democrazy
//
//  Created by Audrey MARTEL on 01/04/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface DemocrazyViewController : UIViewController<UIWebViewDelegate> {
	IBOutlet UIWebView* webview;
    IBOutlet UIButton *backButton;
    
}

@property (nonatomic, retain) UIWebView* webview;
@property (nonatomic, retain) UIButton* backButton;



- (IBAction)backButtonClicked:(id)sender;


@end

