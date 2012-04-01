//
//  DemocrazyViewController.m
//  com.augraph.democrazy
//
//  Created by Audrey MARTEL on 01/04/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import "DemocrazyViewController.h"

@interface DemocrazyViewController ()

@end


@implementation DemocrazyViewController
@synthesize webview;
@synthesize backButton;


- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    NSURL *url = [NSURL fileURLWithPath:[[NSBundle mainBundle] pathForResource:@"index" ofType:@"html" inDirectory:@"www"]];
    [webview loadRequest:[NSURLRequest requestWithURL:url]];
    
    // Do any additional setup after loading the view from its nib.
}

- (void)viewDidUnload
{
    [super viewDidUnload];
    // Release any retained subviews of the main view.
    // e.g. self.myOutlet = nil;
}

- (void)dealloc {
    [backButton release];
    [webview release];
    [super dealloc];
}


- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    return (interfaceOrientation == UIInterfaceOrientationPortrait);
}


#pragma mark UIWebViewDelegate methods
//only used here to enable or disable the back and forward buttons
- (void)webViewDidStartLoad:(UIWebView *)thisWebView
{
    NSLog(@"cangoback %d", webview.canGoBack);
    NSString* ulrStr = [webview.request.URL path];
    NSLog(@"url %@",ulrStr);
    NSRange range = [ulrStr rangeOfString:@"democrazy.app/www"];
    NSLog(@"isfile %d", range.location != NSNotFound);
    
    if(range.location != NSNotFound)
    {
        backButton.enabled = NO;
        backButton.hidden = YES;
    }
    else {
        backButton.enabled = (webview.canGoBack);
        backButton.hidden = !(webview.canGoBack);
    }
    
}

- (void)webViewDidFinishLoad {
    NSLog(@"cangoback %d", webview.canGoBack);
    
    NSLog(@"url %@", webview.request.URL);
    NSRange range = [[webview.request.URL path] rangeOfString:@"democrazy.app/www"];
    NSLog(@"isfile %d", range.location != NSNotFound);
    
    if(range.location != NSNotFound)
    {
        backButton.enabled = NO;
        backButton.hidden = YES;
    }
    else {
        backButton.enabled = (webview.canGoBack);
        backButton.hidden = !(webview.canGoBack);
    }
    
}


- (IBAction)backButtonClicked:(id)sender {
    [webview goBack];
}


@end

