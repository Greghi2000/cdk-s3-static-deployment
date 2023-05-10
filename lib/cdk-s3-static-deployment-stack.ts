import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as cloudfrontOrigins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';

export class StaticWebsiteStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Replace these values with your own
    // const domainName = 'example.com';
    // const subdomain = 'www';

    // Create S3 bucket for website
    const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
      websiteIndexDocument: 'index-home.html',
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Create a certificate
    // const certificate = new acm.DnsValidatedCertificate(this, 'WebsiteCertificate', {
    //   domainName: `${subdomain}.${domainName}`,
    //   hostedZone: route53.HostedZone.fromLookup(this, 'HostedZone', { domainName }),
    //   region: 'us-east-1', // CloudFront requires ACM certificates to be in the us-east-1 region
    // });

    // Create CloudFront distribution
    // const distribution = new cloudfront.Distribution(this, 'WebsiteDistribution', {
    //   defaultBehavior: { origin: new cloudfrontOrigins.S3Origin(websiteBucket) },
    //   domainNames: [`${subdomain}.${domainName}`],
    //   certificate: certificate,
    // });

    // Create Route53 record
    // new route53.ARecord(this, 'WebsiteAliasRecord', {
    //   zone: route53.HostedZone.fromLookup(this, 'HostedZone', { domainName }),
    //   target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
    //   recordName: `${subdomain}.${domainName}`,
    // });

    // Deploy website assets to S3
    new s3deploy.BucketDeployment(this, 'WebsiteDeployment', {
      sources: [s3deploy.Source.asset('./My-Portfolio')],
      destinationBucket: websiteBucket,
      // distribution,
      distributionPaths: ['/*'],
    });
  }
}